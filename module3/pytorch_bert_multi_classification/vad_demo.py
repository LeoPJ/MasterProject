import collections
import contextlib
import sys
import wave

import webrtcvad
import json


def read_wave(path):
    """Reads a .wav file.
    Takes the path, and returns (PCM audio data, sample rate).
    """
    with contextlib.closing(wave.open(path, 'rb')) as wf:
        num_channels = wf.getnchannels()
        assert num_channels == 1
        sample_width = wf.getsampwidth()
        assert sample_width == 2
        sample_rate = wf.getframerate()
        assert sample_rate in (8000, 16000, 32000, 48000)
        pcm_data = wf.readframes(wf.getnframes())
        return pcm_data, sample_rate


def write_wave(path, audio, sample_rate):
    """Writes a .wav file.
    Takes path, PCM audio data, and sample rate.
    """
    with contextlib.closing(wave.open(path, 'wb')) as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio)


class Frame(object):
    """Represents a "frame" of audio data."""
    def __init__(self, bytes, timestamp, duration):
        self.bytes = bytes
        self.timestamp = timestamp
        self.duration = duration


def frame_generator(frame_duration_ms, audio, sample_rate):
    """Generates audio frames from PCM audio data.
    Takes the desired frame duration in milliseconds, the PCM data, and
    the sample rate.
    Yields Frames of the requested duration.
    frame_duration_ms: 10/20/30 ms
    """
    n = int(sample_rate * (frame_duration_ms / 1000.0) * 2)
    offset = 0
    timestamp = 0.0
    duration = (float(n) / sample_rate) / 2.0
    while offset + n < len(audio):
        yield Frame(audio[offset:offset + n], timestamp, duration)
        timestamp += duration
        offset += n


def vad_collector(sample_rate, frame_duration_ms,
                  padding_duration_ms, vad, frames):
    """Filters out non-voiced audio frames.
    Given a webrtcvad.Vad and a source of audio frames, yields only
    the voiced audio.
    Uses a padded, sliding window algorithm over the audio frames.
    When more than 90% of the frames in the window are voiced (as
    reported by the VAD), the collector triggers and begins yielding
    audio frames. Then the collector waits until 90% of the frames in
    the window are unvoiced to detrigger.
    The window is padded at the front and back to provide a small
    amount of silence or the beginnings/endings of speech around the
    voiced frames.
    Arguments:
    sample_rate - The audio sample rate, in Hz.
    frame_duration_ms - The frame duration in milliseconds.
    padding_duration_ms - The amount to pad the window, in milliseconds.
    vad - An instance of webrtcvad.Vad.
    frames - a source of audio frames (sequence or generator).
    Returns: A generator that yields PCM audio data.
    """
    num_padding_frames = int(padding_duration_ms / frame_duration_ms)
    # We use a deque for our sliding window/ring buffer.
    ring_buffer = collections.deque(maxlen=num_padding_frames)
    # We have two states: TRIGGERED and NOTTRIGGERED. We start in the
    # NOTTRIGGERED state.
    triggered = False

    voiced_frames = []
    for frame in frames:
        is_speech = vad.is_speech(frame.bytes, sample_rate)

        # sys.stdout.write('1' if is_speech else '0')
        if not triggered:
            ring_buffer.append((frame, is_speech))
            num_voiced = len([f for f, speech in ring_buffer if speech])
            # If we're NOTTRIGGERED and more than 90% of the frames in
            # the ring buffer are voiced frames, then enter the
            # TRIGGERED state.
            if num_voiced > 0.9 * ring_buffer.maxlen:
                triggered = True
                sys.stdout.write('+(%s)' % (ring_buffer[0][0].timestamp,))
                # sm, ss = divmod(ring_buffer[0][0].timestamp, 60)
                # res.append([f"{int(sm)}:{round(ss, 3)}"])
                res.append([round(ring_buffer[0][0].timestamp, 3)])
                # We want to yield all the audio we see from now until
                # we are NOTTRIGGERED, but we have to start with the
                # audio that's already in the ring buffer.
                for f, s in ring_buffer:
                    voiced_frames.append(f)
                ring_buffer.clear()
        else:
            # We're in the TRIGGERED state, so collect the audio data
            # and add it to the ring buffer.
            voiced_frames.append(frame)
            ring_buffer.append((frame, is_speech))
            num_unvoiced = len([f for f, speech in ring_buffer if not speech])
            # If more than 90% of the frames in the ring buffer are
            # unvoiced, then enter NOTTRIGGERED and yield whatever
            # audio we've collected.
            if num_unvoiced > 0.9 * ring_buffer.maxlen:
                sys.stdout.write('-(%s)' % (frame.timestamp + frame.duration))
                # em, es = divmod(frame.timestamp + frame.duration, 60)
                # res[-1].append(f"{int(em)}:{round(es, 3)}")
                res[-1].append(round(frame.timestamp + frame.duration, 3))
                triggered = False
                yield b''.join([f.bytes for f in voiced_frames])
                ring_buffer.clear()
                voiced_frames = []
    if triggered:
        sys.stdout.write('-(%s)' % (frame.timestamp + frame.duration))
        # em, es = divmod(frame.timestamp + frame.duration, 60)
        # res[-1].append(f"{int(em)}:{round(es, 3)}")
        res[-1].append(round(frame.timestamp + frame.duration, 3))
    sys.stdout.write('\n')
    # If we have any leftover voiced audio when we run out of input,
    # yield it.
    if voiced_frames:
        yield b''.join([f.bytes for f in voiced_frames])


def main(path, aggressiveness):
    audio, sample_rate = read_wave(path)
    vad = webrtcvad.Vad(int(aggressiveness))
    frames = frame_generator(30, audio, sample_rate)
    frames = list(frames)
    segments = vad_collector(sample_rate, 30, 350, vad, frames)
    for i, segment in enumerate(segments):
        path = 'db_7/chunk-%002d.wav' % (i,)
        print(' Writing %s' % (path,))
        # write_wave(path, segment, sample_rate)


# 合并较短的vad片段
def vad_check(res):
    new_res = []
    i = 0
    j = 1
    while j < len(res):
        if (res[j][1] - res[j][0] < 2 and res[j][0] - res[j - 1][1] < 1) or (
                res[i][1] - res[i][0] < 2 and res[j][0] - res[i][1] < 1):
            j += 1
        else:
            new_res.append([res[i][0], res[j - 1][1]])
            i = j
            j += 1
    new_res.append([res[i][0], res[j - 1][1]])

    return new_res


if __name__ == '__main__':
    res = []
    main(path='./media/voice_pack/single/2a_single.wav', aggressiveness=1)

    for i in res:
        print(i)

    new_res = vad_check(res)

    # print("*************************")
    # for i in range(len(res)):
    #     if i < len(new_res):
    #         print(str(res[i]) + ' ' + str(new_res[i]))
    #     else:
    #         print(res[i])

    with open('./media/srt/2a.json', 'r') as f:
        xf_dicts = json.load(f)

    print(len(xf_dicts["xf_result"]["data"]))

    # 讯飞api文件分词
    words = []
    for i in xf_dicts["xf_result"]["data"]:
        bg = int(i['bg'])
        print(i)
        for j in i['wordsResultList']:
            print({'bg': bg + 10 * int(j['wordBg']), 'ed': bg + 10 * int(j['wordEd']), 'word': j['wordsName']})
            words.append({'bg': bg + 10 * int(j['wordBg']), 'ed': bg + 10 * int(j['wordEd']), 'word': j['wordsName']})

    for k in words:
        print(k)

    # 根据vad片段去讯飞api找对应的词，生成字幕
    srt = []
    pt = 0
    for i in new_res:
        start = i[0]
        end = i[1]
        text = ""

        while pt < len(words) - 1 and end > words[pt]['ed'] / 1000:
            text += words[pt]['word']
            pt += 1

        text += words[pt]['word']
        pt += 1

        print({'start': start, 'end': end, 'text': text})



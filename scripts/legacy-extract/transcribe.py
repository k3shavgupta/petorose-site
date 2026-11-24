"""Transcribe the feature video narration (source evidence + captions). Usage: python transcribe.py <video> <out-prefix>"""
import subprocess
import sys

import numpy as np
from faster_whisper import WhisperModel

video, out = sys.argv[1], sys.argv[2]
# Decode with ffmpeg (16 kHz mono PCM) to sidestep the PyAV version faster-whisper pins.
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", video, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                     capture_output=True, check=True).stdout
audio = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768.0
model = WhisperModel("small.en", device="cpu", compute_type="int8")
segments, _ = model.transcribe(audio, beam_size=5, vad_filter=True)


def ts(t, sep):
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d}{sep}{int((s % 1) * 1000):03d}"


segs = list(segments)
with open(out + ".vtt", "w") as vtt, open(out + ".txt", "w") as txt:
    vtt.write("WEBVTT\n\n")
    for s in segs:
        vtt.write(f"{ts(s.start, '.')} --> {ts(s.end, '.')}\n{s.text.strip()}\n\n")
        txt.write(s.text.strip() + "\n")
print(len(segs), "segments")

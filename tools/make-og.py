#!/usr/bin/env python3
"""生成分享预览图 images/og.jpg（1200×630，Open Graph 推荐尺寸）。

图片来源：Wikimedia Commons «Meteora's monastery 2.jpg»
作者 Stathis floros，CC BY-SA 4.0
https://commons.wikimedia.org/wiki/File:Meteora%27s_monastery_2.jpg

署名写在页面 footer 里（CC BY-SA 要求署名并以相同方式共享）。
换图重跑：先把新图存成 tools/og-source.jpg，再执行 python3 tools/make-og.py
"""
import os
import subprocess
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(HERE, "og-source.jpg")
OUT = os.path.join(ROOT, "images", "og.jpg")

REMOTE = ("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/"
          "Meteora%27s_monastery_2.jpg/2000px-Meteora%27s_monastery_2.jpg")

W, H = 1200, 630
# 纵向裁切位置：0 = 贴顶，1 = 贴底。0.5 居中能同时留住岩柱和右下的修道院。
ANCHOR = 0.5


def fetch_source():
    if os.path.exists(SRC):
        return
    print("下载原图 …")
    subprocess.run(["curl", "-sL", "-o", SRC, REMOTE], check=True)


def main():
    fetch_source()
    im = Image.open(SRC).convert("RGB")
    sw, sh = im.size

    # 先按目标比例裁切，再缩放，避免变形
    target = W / H
    if sw / sh > target:                    # 原图更宽 → 裁两侧
        cw, ch = int(sh * target), sh
        left = int((sw - cw) * 0.5)
        box = (left, 0, left + cw, ch)
    else:                                   # 原图更高 → 裁上下
        cw, ch = sw, int(sw / target)
        top = int((sh - ch) * ANCHOR)
        box = (0, top, cw, top + ch)

    im = im.crop(box).resize((W, H), Image.LANCZOS)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    # 逐步降质量，控制在 300KB 以内（各家抓取器都能吃下）
    for q in (86, 82, 78, 74, 70):
        im.save(OUT, "JPEG", quality=q, optimize=True, progressive=True)
        kb = os.path.getsize(OUT) / 1024
        if kb <= 300:
            break
    print(f"写出 {os.path.relpath(OUT, ROOT)}  {W}×{H}  quality={q}  {kb:.0f}KB")
    print(f"裁切自 {sw}×{sh}，box={box}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

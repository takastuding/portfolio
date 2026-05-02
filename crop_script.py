#!/usr/bin/env python3
"""参考デザイン画像を12セクションに分割して public/sections/ に保存する"""
from PIL import Image
import os

img = Image.open("分割用画像.png")
W, H = img.size
print(f"画像サイズ: {W}x{H}")

os.makedirs("public/sections", exist_ok=True)

# 3列 × 4行 = 12セル
# 視覚分析による列境界 (x): 0 | 490 | 1040 | 1536
# 行境界 (y): 0 | 260 | 520 | 780 | 1024
CX = [0, 490, 1040, W]   # 列境界
RY = [0, 260, 520, 780, H]  # 行境界

sections = [
    # (filename, col, row)  — col/row は 0-indexed
    ("01-hero",           0, 0),  # 左上: ヒーロー（キャラ+キャッチ+CTA）
    ("02-services",       1, 0),  # 中上: 服務内容のご案内 + 3カード
    ("03-photo-tagline",  2, 0),  # 右上: 握手写真 + 信頼タグライン
    ("04-pain-points",    0, 1),  # 左中: お悩みリスト
    ("05-why-us-icons",   1, 1),  # 中中: 選ばれる3つの理由（アイコン）
    ("06-flow",           2, 1),  # 右中: 相談の流れ 01-04
    ("07-why-us-detail",  0, 2),  # 左下中: 理由詳細（チェックリスト）
    ("08-cta-banner",     1, 2),  # 中下中: 初回相談は無料です（青バナー）
    ("09-profile",        2, 2),  # 右下中: プロフィール（社労士キャラ）
    ("10-features",       0, 3),  # 左下: 特徴アイコン
    ("11-testimonials",   1, 3),  # 中下: お客様の声
    ("12-contact",        2, 3),  # 右下: 事務所名+電話+予約ボタン
]

for name, col, row in sections:
    x1 = CX[col]
    x2 = CX[col + 1]
    y1 = RY[row]
    y2 = RY[row + 1]
    region = img.crop((x1, y1, x2, y2))
    out_path = f"public/sections/{name}.png"
    region.save(out_path)
    print(f"  {out_path}  ({x2-x1}x{y2-y1})")

print("\n完了: public/sections/ に12枚のPNGを保存しました")

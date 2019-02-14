# GameController　Over　Internet
ミニファミコンをインターネット経由で操作するプロジェクト

システム構成図：
doc/ネット対戦ファミコンシステム構成.jpg

写真：
imgフォルダ内

動画：
https://youtu.be/0baT9exxElA

使い方:
https://blue-tone.github.io/GameControllerOverInternet/
にアクセスして、obnizIdを入力する。
(IDを固定にするには、ページをローカルに保存して、main.jsのobnizIdに設定する。)


doc:
アクリル板の加工データ：
	・ミニファミコンレーザー.ai
		推奨厚：5mm(下から2枚目のみ3mm)
	・電装ケース.ai
		推奨厚：3mm

パーツ：
	・制御部
	タカハ機工 CBS0730	プッシュソレノイド
	アクリル板	5mm、3mm
	M5ネジ
	
	・基板部
	obniz	マイコンボード
	2SK703	MOS-FET
	MP1584	DC-DC
	ACアダプター	 12V5A
	
	・入力部
	USBゲームコントローラ(キーボード入力として動作)

キー：
	USBゲームコントローラ無しで、キーボードでも操作可能。
	上 w
	下 s
	左 a
	右 d

	A 右カーソル
	B 左カーソル



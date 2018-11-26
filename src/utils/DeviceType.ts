/*********************************************
 * デバイスの状態を管理・保存する静的クラス
 * リサイズ時にDeviceType.update()を実行して状態をアップデートする
 **********************************************/

export default class DeviceType {

	static readonly DEVICE_SMP: string = 'smp';
	static readonly DEVICE_TABLET: string = 'tablet';
	static readonly DEVICE_DESKTOP: string = 'desktop';

	/* スマートフォンタイプのデバイス幅かどうか */
	static isSMP: boolean = false;
	/* タブレットPCタイプのデバイス幅かどうか　*/
	static isTablet: boolean = false;
	/* デスクトップorラップトップPCタイプのデバイス幅かどうか　*/
	static isDesktop: boolean = false;
	/* Safariブラウザかどうか　*/
	static isSafari: boolean = false;
	/* iOSかどうか */
	static isIOS: boolean = false;
	/* 現在のウィンドウ幅 */
	static winWidth: number;
	/* 現在のウィンドウ高 */
	static winHeight: number;
	/* 現在のデバイスタイプ */
	static deviceType: string = 'desktop';

	/* スマートフォンタイプのデバイスの最小幅を設定する */
	static readonly SMP_WIDTH: number = 320;
	/* タブレットPCタイプのデバイスの最小幅を設定する */
	static readonly TABLET_WIDTH: number = 640;
	/* デスクトップorラップトップPCタイプのデバイスの最小幅を設定する */
	static readonly DESKTOP_WIDTH: number = 1024;

	/**
	 * デバイスの設定をアップデート
	 * リサイズ時に実行することで、現時点でのウィンドウ幅からデバイスのタイプを判定する
	 */
	static update() {
		const ua = window.navigator.userAgent.toLowerCase();

		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;
		if (this.winWidth < this.DESKTOP_WIDTH) {
			if (this.winWidth < this.TABLET_WIDTH) {
				this.isSMP = true;
				this.isTablet = false;
				this.isDesktop = false;
				this.deviceType = this.DEVICE_SMP;
				console.log('isSMP Layout');
			}
			else {
				this.isSMP = false;
				this.isTablet = true;
				this.isDesktop = false;
				this.deviceType = this.DEVICE_TABLET;
				console.log('isTablet Layout');
			}
		}
		else {
			this.isSMP = false;
			this.isTablet = false;
			this.isDesktop = true;
			this.deviceType = this.DEVICE_DESKTOP;
			console.log('isDesktop Layout');
			if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
				this.isSafari = true;
				console.log('is Safari');
			}
		}

		if (ua.indexOf('iphone') >= 0 || ua.indexOf('ipad') >= 0) {
			this.isIOS = true;
		}
		else if (navigator.userAgent.indexOf("iPod") >= 0) {
			this.isIOS = true;
		}

		console.log('is iOS : ' + this.isIOS);
	}
}

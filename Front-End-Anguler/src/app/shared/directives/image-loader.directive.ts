import { Directive, HostBinding, HostListener, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[imageLoader]'
})
export class ImageLoaderDirective {

	@Input('src') imageSrc;
	@Input('imageFull') imageFull;
	@HostBinding('class.loader-img') loaderClass;
	@HostBinding('class.full') loaderFullClass;
	@HostBinding('class.error-img') imgErrClass;
	@HostBinding('attr.src') attrSrc;

	errorSrc = "/../assets/img/noimage.png";

	@HostListener('load') loadImage() {
		this.loaderClass = false;
		this.loaderFullClass = false;
	}
	@HostListener('error') onError() {
		this.loaderClass = false;
		this.loaderFullClass = false;
		this.imgErrClass = true;
		this.attrSrc = this.errorSrc;
	}

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.imageSrc) {
			this.loaderClass = true;
			this.loaderFullClass = this.imageFull ? true : false;

			if (this.imageSrc) {
				this.attrSrc = this.imageSrc;
			} else {
				this.imgErrClass = true;
				this.attrSrc = this.errorSrc;
			}
		}
	}

	ngOnInit() {

	}

}

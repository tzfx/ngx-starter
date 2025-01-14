import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: 'ng-template[named-template]'
})
export class NamedTemplate {
	@Input('named-template') name: string;

	constructor(public templateRef: TemplateRef<any>) { }
}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {entitiesState} from './entity.route';
import {PageComponent} from './Page/page.component';
import {DialogComponent} from './dialog/dialog.component';

@NgModule({
    imports: [
      RouterModule.forChild(entitiesState),
    ],
    declarations: [
      PageComponent,
      DialogComponent
    ],
    entryComponents: [DialogComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule {}

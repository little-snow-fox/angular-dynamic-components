import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, OnInit, Type} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class PopupService implements OnInit {

  private allComponent: Array<{ component: any, componentRef: any}>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private router: Router,
              private injector: Injector,
              private appRef: ApplicationRef
  ) {
    this.allComponent = [];
  }

  ngOnInit() {
    // 当路由发生变更的时候清除所有弹窗
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.allComponent.forEach(item => {
          item.componentRef.destroy();
        });
        this.allComponent = [];
      }
    });
  }

  load(componentType: Type<any>, params: any): any {
    return this.loadComponent(componentType, params);
  }

  eject(component: any) {
    this.ejectComponent(component);
  }

  private loadComponent(componentType: Type<any>, params: any): any {

    // 创建构造工厂
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    // 创建标签容器
    const dom = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(dom);
    // 用构造工厂创建组件实体，并把组件放到标签容器里面
    const componentRef = factory.create(this.injector, [], dom); // Use root injector
    // 把参数传进组件里面
    if (params) {
      for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
          componentRef.instance[prop] = params[prop];
        }
      }
    }
    componentRef.changeDetectorRef.detectChanges(); // Immediately change detection to avoid multi-checking error
    // 把组件加到app根组件里面，否则这个动态组件会失效，组件无法和对应的html挂钩，页面数据无法检查更新，连注销组件(destroy)都做不到
    this.appRef.attachView(componentRef.hostView); // Load view into app root
    const component = componentRef.instance;

    this.allComponent.push({
      component,
      componentRef
    });

    return component;
  }

  private ejectComponent(component: any) {
    for (let i = 0; i < this.allComponent.length; i++) {
      if (this.allComponent[i].component === component) {
        this.allComponent[i].componentRef.destroy();
        this.allComponent.splice(i, 1);
      }
    }
  }

}

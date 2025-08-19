import type {
  HeaderPosition,
  InsertHeaderProps,
  PagerData,
  QiankunProps,
  ResetPasswordInstance,
  RouterQuery,
} from "./types";

class Actions {
  pager: any = null;
  name: any = null;
  public setActions(props: QiankunProps) {
    props.pager.subscribe((v: any) => {});
    this.pager = props.pager;
    this.name = props.name;
  }

  private pagerState(data: PagerData) {
    this.pager.next({ from: this.name, data });
  }

  public oAuth(data: any) {
    this.pagerState({ type: "login", data });
  }

  public setPageNav(headerData: {
    title?: string | unknown;
    content?: string | unknown;
  }) {
    this.pagerState({
      type: "pageHeader",
      data: headerData,
    });
  }

  public insertHeader(
    position: HeaderPosition,
    component: any,
    props: InsertHeaderProps = {}
  ) {
    this.pagerState({
      type: "customHeader",
      data: { position, component, props },
    });
  }

  public insertUserMenu(component: any, props: InsertHeaderProps = {}) {
    this.pagerState({
      type: "customUserMenu",
      data: { component, props },
    });
  }

  public router(path: string, query: RouterQuery = {}) {
    this.pagerState({
      type: "router",
      data: { path, query },
    });
  }

  public resetPwd(data: ResetPasswordInstance) {
    this.pagerState({
      type: "resetPassword",
      data: data,
    });
  }
  public loginOut() {
    this.pagerState({
      type: "loginOut",
    });
  }
}

const actions = new Actions();

export default actions;

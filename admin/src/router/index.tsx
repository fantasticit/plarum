import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Ownspace } from "../pages/Ownspace";
import { UserManager } from "../pages/UserManager";
import { ArticleManager } from "../pages/ArticleManager";
import { ArticleEditor } from "../pages/ArticleEditor";
import { TagManager } from "../pages/TagManager";

import { BaseComponent as _403 } from "../pages/403";
import { BaseComponent as _404 } from "../pages/404";
import { BaseComponent as _500 } from "../pages/500";

export interface IRoute {
  path?: string;
  title: string;
  icon?: string;
  component?: any;
  children?: Array<IRoute>;
}

export const routes: IRoute[] = [
  {
    path: "/login",
    title: "login",
    component: Login
  },

  {
    path: "/register",
    title: "register",
    component: Register
  },

  {
    path: "/",
    icon: "dashboard",
    title: "ownspace",
    component: Ownspace
  },

  {
    path: "/users",
    icon: "team",
    title: "userManager",
    component: UserManager
  },

  {
    icon: "table",
    title: "articleManager",

    children: [
      {
        path: "/article/list",
        icon: "table",
        title: "articleList",
        component: ArticleManager
      },

      {
        path: "/article/new/",
        icon: "form",
        title: "createArticle",
        component: ArticleEditor
      },

      {
        path: "/article/tag",
        icon: "tag",
        title: "tagManager",
        component: TagManager
      }
    ]
  }
];

export const breadcrumbNameMap: { [key: string]: string } = {
  "/": "ownspace",
  "/users": "userManager",
  "/article": "articleManager",
  "/article/list": "articleList",
  "/article/new": "createArticle",
  "/article/tag": "tagManager"
};

export const Router: React.FC = () => {
  return (
    <Switch>
      {routes
        .reduce((a: IRoute[], c: IRoute): IRoute[] => {
          if (c.children) {
            a.push.apply(a, c.children);
          } else {
            a.push(c);
          }
          return a;
        }, [])
        .map(({ path, component }) => (
          <Route key={path} path={path} exact={true} component={component} />
        ))}
      <Route key={"403"} path={"/403"} exact={true} component={_403} />
      <Route key={"404"} path={"/404"} exact={true} component={_404} />
      <Route key={"500"} path={"/500"} exact={true} component={_500} />
      <Redirect path="/article" to="/article/list" />
      <Route component={_404} />
    </Switch>
  );
};

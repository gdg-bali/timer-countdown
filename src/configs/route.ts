// You'll see shortly that declaring the types will make sure each time we add a page object, it will follow a strict rule pattern and won't compile any errors.

import { JSX } from "react";

export interface routerType {
 title: string;
 path: string;
 element: JSX.Element;
 items?: routerType[]; // Optional nested routes
}
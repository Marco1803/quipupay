export class Navigation {
    id?: number;
    title: string;
    translate: string;
    type: string;
    icon: string;
    url: string;
    children: Navigation[];
    completo: boolean;


    constructor(
        public _id?: number,
        public _title?: string,
        public _translate?: string,
        public _type?: string,
        public _icon?: string,
        public _url?: string,
        public _children?: Navigation[]
    ) {
        this.id = _id;
        this.title = _title;
        this.translate = _translate;
        this.type = _type;
        this.icon = _icon;
        this.url = _url;
        this.children = _children;
    }
}

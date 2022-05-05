/** Global definitions for development * */

export global {
    declare module '*.scss' {
        const styles: any;
        export = styles;
        const classes: { readonly [key: string]: string };
        export default classes;
    }

    declare module '*.svg' {
        import { ReactElement, SVGProps } from 'react';

        const content: (props: SVGProps<SVGElement>) => ReactElement;
        export default content;
    }

    declare module '*.svg?url' {
        const content: string;
        export default content;
    }

    declare module '*.less' {
        const styles: any;
        export = styles;
        const classes: { readonly [key: string]: string };
        export default classes;
    }

    declare module '*.css' {
        const styles: any;
        export = styles;
    }

    declare module '*.png';
    declare module '*.jpg';

}

import { ResultLineItem } from '@yal-app/types';
import rehypeRaw from 'rehype-raw';
import remakrGfm from 'remark-gfm';
import { createEffect, JSX } from 'solid-js';
import SolidMarkdown from 'solid-markdown';
import { tailwindClasses } from 'state/theme';
import { highlightAll } from 'utils/highlight';
import { Options } from 'solid-markdown/dist/ast-to-solid';

const componentMap: Options['components'] = {
  ol(props) {
    return <ol class={tailwindClasses()['markdown-ol']}>{props.children}</ol>;
  },
  blockquote(props) {
    return (
      <blockquote class={tailwindClasses()['markdown-blockquote']}>
        {props.children}
      </blockquote>
    );
  },
  em(props) {
    return <em class={tailwindClasses()['markdown-em']}>{props.children}</em>;
  },
  strong(props) {
    return (
      <strong class={tailwindClasses()['markdown-strong']}>
        {props.children}
      </strong>
    );
  },
  del(props) {
    return (
      <del class={tailwindClasses()['markdown-del']}>{props.children}</del>
    );
  },
  hr() {
    return <hr class={tailwindClasses()['markdown-hr']} />;
  },
  ul(props) {
    return <ul class={tailwindClasses()['markdown-ul']}>{props.children}</ul>;
  },
  li(props) {
    return (
      <li class={tailwindClasses()['markdown-list-item']}>{props.children}</li>
    );
  },
  // @ts-ignore
  code({ className, children, ...props }) {
    return (
      <code
        class={`${tailwindClasses()['markdown-code']} ${
          className ? className : ''
        }`}
        {...props}
      >
        {children}
      </code>
    );
  },
  // @ts-ignore
  table({ className, children, ...props }) {
    return (
      <table
        class={`${tailwindClasses()['markdown-table']} ${
          className ? className : ''
        }`}
        {...props}
      >
        {children}
      </table>
    );
  },
  h1(props) {
    return <h1 class={tailwindClasses()['markdown-h1']}>{props.children}</h1>;
  },
  h2(props) {
    return <h2 class={tailwindClasses()['markdown-h2']}>{props.children}</h2>;
  },
  h3(props) {
    return <h3 class={tailwindClasses()['markdown-h3']}>{props.children}</h3>;
  },
  h4(props) {
    return <h4 class={tailwindClasses()['markdown-h4']}>{props.children}</h4>;
  },
  h5(props) {
    return <h5 class={tailwindClasses()['markdown-h5']}>{props.children}</h5>;
  },
  h6(props) {
    return <h6 class={tailwindClasses()['markdown-h5']}>{props.children}</h6>;
  },
  p(props) {
    return (
      <p class={tailwindClasses()['markdown-p']} {...props}>
        {props.children}
      </p>
    );
  },
  img({ ...props }) {
    return <img class={tailwindClasses()['markdown-img']} {...props} />;
  },
  a({ ...props }) {
    return (
      <a class={tailwindClasses()['markdown-a']} {...props}>
        {props.children}
      </a>
    );
  },
};

export const Markdown = (props: { resultItem: ResultLineItem }) => {
  createEffect(async () => {
    await highlightAll();
  });

  if (!props.resultItem.description) return null;

  return (
    <div class="prose lg:prose-xl">
      <SolidMarkdown
        rehypePlugins={[rehypeRaw, remakrGfm]}
        children={props.resultItem.description.trim()}
        components={componentMap}
      />
    </div>
  );
};

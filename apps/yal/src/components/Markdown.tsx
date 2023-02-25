import { ResultLineItem } from '@yal-app/types';
import { children, createEffect } from 'solid-js';
import SolidMarkdown from 'solid-markdown';
import { config } from 'state/config';
import { tailwindClasses } from 'state/theme';
import { setToast } from 'state/toast';
import { highlightAll } from 'utils/highlight';

const componentMap = {
  ol({ node, inline, className, children, ...props }) {
    return <ol class={tailwindClasses()['markdown-ol']}>{children}</ol>;
  },
  blockquote({ node, inline, className, children, ...props }) {
    return (
      <blockquote class={tailwindClasses()['markdown-blockquote']}>
        {children}
      </blockquote>
    );
  },
  em({ node, inline, className, children, ...props }) {
    return <em class={tailwindClasses()['markdown-em']}>{children}</em>;
  },
  strong({ node, inline, className, children, ...props }) {
    return (
      <strong class={tailwindClasses()['markdown-strong']}>{children}</strong>
    );
  },
  del({ node, inline, className, children, ...props }) {
    return <del class={tailwindClasses()['markdown-del']}>{children}</del>;
  },
  hr({ node, inline, className, children, ...props }) {
    return <hr class={tailwindClasses()['markdown-hr']} />;
  },
  ul({ node, inline, className, children, ...props }) {
    return <ul class={tailwindClasses()['markdown-ul']}>{children}</ul>;
  },
  li({ node, inline, className, children, ...props }) {
    return <li class={tailwindClasses()['markdown-list-item']}>{children}</li>;
  },
  code({ node, inline, className, children, ...props }) {
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
  h1({ node, inline, className, children, ...props }) {
    return <h1 class={tailwindClasses()['markdown-h1']}>{children}</h1>;
  },
  h2({ node, inline, className, children, ...props }) {
    return <h2 class={tailwindClasses()['markdown-h2']}>{children}</h2>;
  },
  h3({ node, inline, className, children, ...props }) {
    return <h3 class={tailwindClasses()['markdown-h3']}>{children}</h3>;
  },
  h4({ node, inline, className, children, ...props }) {
    return <h4 class={tailwindClasses()['markdown-h4']}>{children}</h4>;
  },
  h5({ node, inline, className, children, ...props }) {
    return <h5 class={tailwindClasses()['markdown-h5']}>{children}</h5>;
  },
  h6({ node, inline, className, children, ...props }) {
    return <h6 class={tailwindClasses()['markdown-h5']}>{children}</h6>;
  },
  p({ node, inline, className, children, ...props }) {
    return (
      <p class={tailwindClasses()['markdown-p']} {...props}>
        {children}
      </p>
    );
  },
  img({ node, inline, className, ...props }) {
    return <img class={tailwindClasses()['markdown-img']} {...props} />;
  },
  a({ node, inline, className, ...props }) {
    return (
      <a class={tailwindClasses()['markdown-a']} {...props}>
        {children}
      </a>
    );
  },
};

export const Markdown = (props: { resultItem: ResultLineItem }) => {
  createEffect(async () => {
    await highlightAll();
  });

  return (
    <div class="prose lg:prose-xl">
      <SolidMarkdown
        children={props.resultItem.description.trim()}
        components={componentMap}
      />
    </div>
  );
};

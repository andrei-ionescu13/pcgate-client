// 'use client';
// import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
// import { styled } from '@mui/material/styles';
// import clsx from 'clsx';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';
// import { usePathname } from 'next/navigation';
// import * as React from 'react';

// // Add support for the sx prop for consistency with the other branches.
// const Anchor = styled('a')({});

// interface NextLinkComposedProps
//   extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
//     Omit<
//       NextLinkProps,
//       'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'
//     > {
//   to: NextLinkProps['href'];
//   linkAs?: NextLinkProps['as'];
//   ref?: React.RefObject<HTMLAnchorElement>;
// }

// export const NextLinkComposed: React.FC<NextLinkComposedProps> = (props) => {
//   const {
//     to,
//     linkAs,
//     replace,
//     scroll,
//     shallow,
//     prefetch,
//     locale,
//     ref,
//     ...rest
//   } = props;

//   return (
//     <NextLink
//       href={to}
//       prefetch={prefetch}
//       as={linkAs}
//       replace={replace}
//       scroll={scroll}
//       shallow={shallow}
//       passHref
//       locale={locale}
//       ref={ref}
//       {...rest}
//     />
//   );
// };

// export type LinkProps = {
//   activeClassName?: string;
//   as?: NextLinkProps['as'];
//   href: NextLinkProps['href'];
//   linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
//   noLinkStyle?: boolean;
// } & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
//   Omit<MuiLinkProps, 'href'>;

// // A styled version of the Next.js Link component:
// // https://nextjs.org/docs/api-reference/next/link
// export const Link: React.FC<LinkProps> = (props) => {
//   const {
//     activeClassName = 'active',
//     as,
//     className: classNameProps,
//     href,
//     linkAs: linkAsProp,
//     locale,
//     noLinkStyle,
//     prefetch,
//     replace,
//     role, // Link don't have roles.
//     scroll,
//     shallow,
//     ref,
//     ...rest
//   } = props;

//   const pathname = usePathname();
//   const linkPathname = typeof href === 'string' ? href : href.pathname;
//   const className = clsx(classNameProps, {
//     [activeClassName]: pathname === linkPathname && activeClassName,
//   });

//   const isExternal =
//     typeof href === 'string' &&
//     (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

//   if (isExternal) {
//     if (noLinkStyle) {
//       return (
//         <Anchor
//           className={className}
//           href={href}
//           ref={ref}
//           {...rest}
//         />
//       );
//     }

//     return (
//       <MuiLink
//         className={className}
//         href={href}
//         ref={ref}
//         {...rest}
//       />
//     );
//   }

//   const linkAs = linkAsProp || as;
//   const nextjsProps = {
//     to: href,
//     linkAs,
//     replace,
//     scroll,
//     shallow,
//     prefetch,
//     locale,
//   };

//   if (noLinkStyle) {
//     return (
//       <NextLinkComposed
//         className={className}
//         ref={ref}
//         {...nextjsProps}
//         {...rest}
//       />
//     );
//   }

//   return (
//     <MuiLink
//       component={NextLinkComposed}
//       className={className}
//       ref={ref}
//       {...nextjsProps}
//       {...rest}
//     />
//   );
// };

// export default Link;

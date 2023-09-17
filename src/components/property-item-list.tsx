import { Fragment, type FC } from "react";
import { Link } from "./link";

interface LinkListProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export const LinkList: FC<LinkListProps> = (props) => {
  const { items } = props;

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          <Link href={item.href} color="textPrimary">
            {item.label}
          </Link>
          {items.length > index + 1 && <>, &nbsp;</>}
        </Fragment>
      ))}
    </>
  );
};

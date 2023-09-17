import type { FC } from "react";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { Box, Button, Typography, Link } from "@mui/material";

interface LinkCategoriesProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export const LinkCategories: FC<LinkCategoriesProps> = (props) => {
  const { items } = props;
  const scrollTo = useScrollTo();
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const categories = [
    {
      char: "0-9",
      items: (items || []).filter((item) => /^[0-9]/.test(item.label)),
    },
    ...alpha.map((char) => ({
      char,
      items: (items || []).filter((item) =>
        item.label.toLowerCase().startsWith(char.toLowerCase())
      ),
    })),
  ];

  const filteredCategories = categories.filter(
    (category) => !!category.items.length
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 5 }}>
        {filteredCategories.map((category) => (
          <Button
            key={category.char}
            color="white"
            variant="outlined"
            size="small"
            onClick={() => {
              const el: HTMLElement | null = document.querySelector(
                `#category_${category.char}`
              );
              console.log(`.category_${category.char}`);
              el && scrollTo(el);
            }}
          >
            {category.char}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredCategories.map((category) => (
          <Box
            key={category.char}
            sx={{ display: "flex", gap: 5 }}
            id={`category_${category.char}`}
          >
            <Box sx={{ minWidth: 80 }}>
              <Typography variant="h4">{category.char}</Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                flex: 1,
                pt: 1,
              }}
            >
              {category.items.map((item) => (
                <Link href={item.href} key={item.href} color="textPrimary">
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

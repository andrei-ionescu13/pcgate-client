import type { FC } from 'react';
import { Box, Card, Skeleton, Typography } from '@mui/material';
import { Link } from '@/components/link';
// import { useCountdown } from '../temp/hooks/use-countdown';
import type { Product } from '@/types/product';
// import { LoadingImage } from './loading-image';
interface CountdownProductProps {
  countdownDate: Date;
  label: string;
  loading?: boolean;
  product?: Product;
}

export const CountdownProduct: FC<CountdownProductProps> = (props) => {
  const { countdownDate, label, loading = false, product } = props;
  // const timeDiff = useCountdown(countdownDate);

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          borderRadius: 1,
          pb: 'calc(56.285714285714285% + 55.66px)'
        }}
      />
    );
  }

  // return (
  //   <Link
  //     href={`/games/${product?.slug}`}
  //     underline="none"
  //   >
  //     <Card
  //       sx={{
  //         flex: 1,
  //         backgroundColor: 'background.paper',
  //         color: '#fff',
  //         height: '100%',
  //         display: 'flex',
  //         flexDirection: 'column'
  //       }}
  //       elevation={0}
  //     >
  //       <img
  //         alt=""
  //         src={`https://fanatical.imgix.net/product/original/${product?.cover}?auto=compress,format&w=350&fit=crop&h=197`}
  //       />
  //       <Box
  //         sx={{
  //           alignItems: 'center',
  //           display: 'flex',
  //           p: 1
  //         }}
  //       >
  //         <Typography
  //           color="textPrimary"
  //           variant="overline"
  //         >
  //           {label}
  //         </Typography>
  //         <Box sx={{ flexGrow: 1 }} />
  //         {timeDiff.map((item) => (
  //           <Card
  //             elevation={0}
  //             key={item.label}
  //             sx={{
  //               color: '#fff',
  //               backgroundColor: '#1E4582',
  //               alignItems: 'center',
  //               display: 'flex',
  //               flexDirection: 'column',
  //               px: 0.5,
  //               py: 0.25,
  //               '& + &': {
  //                 ml: 1
  //               }
  //             }}
  //           >
  //             <Typography
  //               color="inherit"
  //               variant="body2"
  //               sx={{ fontSize: 12 }}
  //             >
  //               {item.value}
  //             </Typography>
  //             <Typography
  //               color="inherit"
  //               sx={{
  //                 fontSize: '0.5rem',
  //                 textTransform: 'uppercase'
  //               }}
  //               variant="caption"
  //             >
  //               {item.label}
  //             </Typography>
  //           </Card>
  //         ))}
  //       </Box>
  //     </Card>
  //   </Link>
  // );

  return null;
};

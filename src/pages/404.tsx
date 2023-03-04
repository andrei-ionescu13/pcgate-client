import { Link } from '@/components/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import notFoundImage from '../../public/images/404.gif'

const NotFound = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh'
      }}
    >
      <Image
        layout="fill"
        objectFit="cover"
        src={notFoundImage}
        alt="Picture of the author"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          placeContent: 'center',
          gap: 1
        }}
      >
        <Typography
          color="textPrimary"
          variant="h1"
        >
          404
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
        >
          It seems you have got lost
        </Typography>
        <Button
          component={Link}
          href="/"
          color="white"
          variant="text"
        >
          Take me home
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound;

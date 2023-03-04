import { useState, Fragment } from 'react';
import type { FC, MouseEvent } from 'react';
import { Box, Card, Button, Typography, IconButton } from '@mui/material';
import { Link } from '@/components/link';
import { format } from 'date-fns';
import { ContentCopyOutlined as ContentCopyIcon } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { Coupon as CouponI } from '@/types/coupon';

interface CouponProps {
  coupon: CouponI;
}

export const Coupon: FC<CouponProps> = (props) => {
  const { coupon: promoCode } = props;
  const [hasCopied, setHasCopied] = useState(false);
  const active = promoCode.status === 'active';

  const handleCopyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(promoCode.code)
    setHasCopied(true)
  }

  return (
    <Card
      sx={{
        backgroundColor: 'background.default',
        p: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center'
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle1"
        >
          {promoCode.code}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip
          title={hasCopied ? 'Copied' : 'Copy'}
          placement="top"
          TransitionProps={{
            onExited: () => { setHasCopied(false) }
          }}
        >
          <IconButton
            size="small"
            onClick={handleCopyToClipboard}
            disabled={!active}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        color="textPrimary"
        variant="body2"
      >
        {promoCode.value}
        {promoCode.type === 'percentage' ? '%' : '$'}
        {' '}
        off
      </Typography>
      <Typography
        color="textPrimary"
        variant="body2"
      >
        Applies to
        {" "}
        {promoCode.productSelection === "general" ? 'any product' : !!promoCode.products && promoCode.products.map((product, index) => (
          <Fragment key={product._id}>
            <Link
              color="textPrimary"
              variant="body2"
              href={`/games/${product.slug}`}
            >
              {product.title}
            </Link>
            {!!promoCode.products && promoCode.products.length > index + 1 && ', '}
          </Fragment>
        ))}
      </Typography>
      {promoCode.endDate && (
        <Typography
          color="textSecondary"
          variant="body3"
        >
          Expire on  {format(new Date(promoCode.endDate), 'dd.MM.yyyy hh:mm')}
        </Typography>
      )}
      <Box mt={1}>
        {active ? (
          <Button
            component={Link}
            href={`/cart?voucher=${promoCode.code}`}
            color="primary"
            variant="contained"
          >
            Apply
          </Button>
        ) : (
          <Typography
            color={promoCode.status === 'used' ? 'info.main' : 'error'}
            variant="subtitle2"
          >
            {promoCode.status === 'used' ? 'Used' : 'Expired'}
          </Typography>
        )}
      </Box>
    </Card>
  )
}

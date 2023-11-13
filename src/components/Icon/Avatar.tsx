import Image, { ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height'> {
    src?: ImageProps['src'];
    size: ImageProps['width'];
}

export const Avatar = ({ src, alt, size, ...props }: Props) => (
  <Image
    src={src ?? '/image/no_image.png'}
    alt={alt ?? 'image'}
    width={size}
    height={size}
    style={{
      borderRadius: '50%',
    }}
    {...props}
  />
)

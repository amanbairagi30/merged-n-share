import Safari from '@/components/ui/safari';

export function DesktopScreen() {
  return (
    <div className="relative z-50">
      <Safari
        url="mergedandshare.in"
        className="size-full shadow-2xl shadow-primary/30 dark:shadow-primary/20"
        srcDark={
          'https://res.cloudinary.com/dazeowi1e/image/upload/v1728840128/m-n-s/r59k3zxz5h5vypkyurrs.png'
        }
        srcLight={
          'https://res.cloudinary.com/dazeowi1e/image/upload/v1728841203/m-n-s/ycjhziv4v1wukw6osmuf.png'
        }
      />
    </div>
  );
}

import { cn } from '@/lib/utils';
import * as RadixAvatar from '@radix-ui/react-avatar';

type DivLikeProps = React.ComponentProps<'div'>;
type ImgLikeProps = React.ComponentProps<'img'>;

export function Avatar({ className, ...props }: DivLikeProps) {
	return <RadixAvatar.Root className={cn('rounded-full overflow-hidden', className)} {...props} />;
}

export function AvatarImage({ className, ...props }: ImgLikeProps) {
	return <RadixAvatar.Image className={cn('w-full h-full object-cover', className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: DivLikeProps) {
	return (
		<RadixAvatar.Fallback
			className={cn('flex items-center justify-center bg-muted text-muted-foreground', className)}
			{...props}
		/>
	);
}

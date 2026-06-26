import { useRef, type FC, type HTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useDomRect } from "@/hooks/useDomRect";


interface IHeaderLeftProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const HeaderLeft: FC<IHeaderLeftProps> = (props) => {
	const { children, className, ...rest } = props;


	return (
		<div
			data-component-name='Header/HeaderLeft'
			className={'flex items-center gap-4 ltr:md:mr-auto rtl:md:ml-auto'}
			{...rest}>
			<button
				type='button'
				aria-label='Toggle Aside Menu'
				className='flex h-12 w-12 items-center justify-center md:hidden'>
			</button>
			{children}
		</div>
	);
};
HeaderLeft.displayName = 'HeaderLeft';

interface IheaderContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const HeaderContent: FC<IheaderContentProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Header/HeaderContent'
			className={`flex items-center gap-4 ${className}`}
			{...rest}>
			{children}
		</div>
	);
};

HeaderContent.displayName = 'HeaderContent';

interface IHeaderLinkProps extends LinkProps {
	children: ReactNode;
	className?: string;
}

export const HeaderLink: FC<IHeaderLinkProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<Link
			className={`text-muted-foreground hover:text-foreground transition-colors ${className || ''}`}
			{...rest}>
			{children}
		</Link>
	);
};

HeaderLink.displayName = 'HeaderLink';

interface IHeaderRightProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const HeaderRight: FC<IHeaderRightProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Header/HeaderRight'
			className={'flex items-center gap-4 ltr:md:ml-auto rtl:md:mr-auto'}
			{...rest}>
			{children}
		</div>
	);
};
HeaderRight.displayName = 'HeaderRight';



interface IHeaderProps {
	children: ReactNode;
	className?: string;
}
const Header: FC<IHeaderProps> = (props) => {
	const { children, className, ...rest } = props;

	const divRef = useRef<HTMLDivElement>(null);
	const [domRect] = useDomRect(divRef);

	return (
		<>
			<style>{`:root {--header-height: ${domRect?.height || 0}px}`}</style>
			<header
				ref={divRef}
				data-component-name='Header'
				className={`sticky top-0 z-40 flex justify-between gap-4 border-b border-border bg-header/75 text-header-foreground p-6 backdrop-blur-md ${className}`}
				{...rest}>
				{children}
			</header>
		</>
	);
};
Header.displayName = 'Header';

export default Header;

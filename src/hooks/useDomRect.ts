import { useState, useLayoutEffect, type RefObject } from 'react';

export const useDomRect = (ref: RefObject<HTMLElement | null>): [DOMRect | null] => {
	const [rect, setRect] = useState<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (!ref.current) return;

		const updateRect = () => {
			if (ref.current) {
				setRect(ref.current.getBoundingClientRect());
			}
		};

		updateRect();

		if (typeof ResizeObserver !== 'undefined') {
			const observer = new ResizeObserver(updateRect);
			observer.observe(ref.current);
			return () => observer.disconnect();
		}

		window.addEventListener('resize', updateRect);
		return () => window.removeEventListener('resize', updateRect);
	}, [ref]);

	return [rect];
};

export default useDomRect;

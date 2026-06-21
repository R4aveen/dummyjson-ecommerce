import DefaultHeaderTemplates from '@/templates/Headers/DefaultHeaderTemplates';
import type { RouteProps } from 'react-router-dom';

export const headerRoutes: RouteProps[] = [
    { path: "*", element: <DefaultHeaderTemplates /> }
];
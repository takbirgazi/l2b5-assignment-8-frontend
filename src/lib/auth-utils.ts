export type UserRole = "SUPER_ADMIN" | "AGENT" | "USER";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile"],
    patterns: [],
}

export const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/agent/],
    exact: [], 
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], 
    exact: [], 
}

export const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/user/], 
    exact: [],
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "SUPER_ADMIN" | "AGENT" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "SUPER_ADMIN";
    }
    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "AGENT";
    }
    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "USER";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "SUPER_ADMIN") {
        return "/admin";
    }
    if (role === "AGENT") {
        return "/agent";
    }
    if (role === "USER") {
        return "/user";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}
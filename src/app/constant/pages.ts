export class Pages {
    public static tabLinks: Map<string, string> = new Map([
        ["Login", "/login"],
        ["Register", "/register"],
        ["Dashboard", "/dashboard"],
        ["Accounts", "/#"],
        ["Profile", "/#"],
        ["Sign Out", "/login?redirectFrom=signout"]
    ]);
}
export default {
    up() {

    },
    down(size) {
        const sizes = {
            xs: "575.98px",
            sm: "767.98px",
            md: "991.98px",
            lg: "1999.98px"
        };
        return `@media (max-width: ${sizes[size]})`;
    }
}
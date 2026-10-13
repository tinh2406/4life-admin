/**
 * Discord Design System — TableHead
 * CRITICAL: Do NOT set display: "block" — it breaks column alignment
 * between thead and tbody. Let the browser use its default table-header-group.
 */
const tableHead = {
  styleOverrides: {
    root: {
      // Intentionally no display override — keep default table-header-group
    },
  },
};

export default tableHead;

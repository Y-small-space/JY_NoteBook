import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 18, // 从16px增大到18px
    fontFamily: 'var(--font-sans)',
    colorPrimary: 'var(--color-primary)',
    borderRadius: 8,
    colorBgContainer: 'var(--color-bg)',
    colorText: 'var(--color-text)',
    colorBorder: 'var(--color-border)',
    colorTextSecondary: 'var(--color-text-secondary)',
  },
  components: {
    Layout: {
      colorBgHeader: 'var(--color-bg)',
      colorBgBody: 'var(--color-bg)',
      colorBgTrigger: 'var(--color-bg-secondary)',
    },
    Card: {
      colorBgContainer: 'var(--color-bg)',
      boxShadow: 'var(--shadow-sm)',
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
  },
};

export default theme;
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: '#1677ff',
    borderRadius: 6,
    colorBgContainer: 'var(--color-bg)',
    colorText: 'var(--color-text)',
    colorBorder: 'var(--color-border)',
  },
  components: {
    Layout: {
      colorBgHeader: 'var(--color-bg)',
      colorBgBody: 'var(--color-bg-secondary)',
    },
    Card: {
      colorBgContainer: 'var(--color-bg)',
    },
  },
};

export default theme;
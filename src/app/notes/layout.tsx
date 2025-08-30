'use client';
import { Layout } from 'antd';
import ThemeSwitch from '@/components/ThemeSwitch';
import styles from './layout.module.scss';
import { Header } from 'antd/es/layout/layout';

const { Content } = Layout;

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>JY Notebook</div>
        <div className={styles.actions}>
          <ThemeSwitch />
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
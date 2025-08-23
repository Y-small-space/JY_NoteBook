'use client';
import { Layout } from 'antd';
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
      <Header>
        <div className={styles.logo} >JY Notebook</div>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
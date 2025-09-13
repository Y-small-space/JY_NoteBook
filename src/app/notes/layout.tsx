'use client';
import { Button, Layout } from 'antd';
import ThemeSwitch from '@/components/ThemeSwitch';
import styles from './layout.module.scss';
import { Header } from 'antd/es/layout/layout';
import { useRouter } from "next/navigation";

const { Content } = Layout;

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>JY Notebook</div>
        <div>
          <Button type="link" onClick={() => router.push("/notes?is=html")}>HTML</Button>
          <Button type="link" onClick={() => router.push("/notes?is=js")}>JS</Button>
          <Button type="link" onClick={() => router.push("/notes?is=ts")}>TypeScript</Button>
          <Button type="link" onClick={() => router.push("/notes?is=css")}>CSS</Button>
          <Button type="link" onClick={() => router.push("/notes?is=react")}>React</Button>
          <Button type="link" onClick={() => router.push("/notes?is=reactp")}>ReactP</Button>
          <Button type="link" onClick={() => router.push("/notes?is=nodejs")}>NodeJS</Button>
          <Button type="link" onClick={() => router.push("/notes?is=wp")}>WebPack</Button>
          <Button type="link" onClick={() => router.push("/notes?is=net")}>NET</Button>
        </div>
        <div className={styles.actions}>
          <ThemeSwitch />
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
'use client';

import { Layout, Menu } from 'antd';
import { FileTextOutlined, PlusOutlined, ImportOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import styles from './layout.module.scss';

const { Sider, Content } = Layout;

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/notes',
      icon: <FileTextOutlined />,
      label: '我的笔记',
    },
    {
      key: '/notes/new',
      icon: <PlusOutlined />,
      label: '新建笔记',
    },
    {
      key: '/notes/import',
      icon: <ImportOutlined />,
      label: '导入笔记',
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider theme="light" className={styles.sider}>
        <div className={styles.logo}>JY Notebook</div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
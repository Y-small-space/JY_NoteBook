'use client';

import { useRouter } from 'next/navigation';
import { Card, Typography, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNoteStore } from '@/lib/store/noteStore';
import styles from './page.module.scss';

const { Text } = Typography;

export default function NotesPage() {
  const router = useRouter();
  const { notes, deleteNote } = useNoteStore();

  const handleEdit = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]} className={styles.noteGrid}>
        {notes.map((note) => (
          <Col key={note.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className={styles.noteCard}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(note.id)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(note.id)}
                />,
              ]}
            >
              <Card.Meta
                title={note.title}
                description={
                  <div className={styles.noteContent}>
                    <Text type="secondary" className={styles.noteTime}>
                      {new Date(note.updatedAt).toLocaleString()}
                    </Text>
                    <Text ellipsis={{ rows: 3 }}>{note.content}</Text>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
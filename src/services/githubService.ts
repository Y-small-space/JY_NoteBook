import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getNoteBook() {
  try {
    const response: any = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'Y-small-space',
      repo: 'DB',
      path: 'Resource/JS.md',
    });
    // 解码 base64 内容
    if (Array.isArray(response.data)) {
      throw new Error("Path is a directory or invalid.");
    }
    const { content } = response.data;
    if (!content) {
      throw new Error("File content not found.");
    }

    // base64 -> Uint8Array
    const byteChars = atob(content);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 用 UTF-8 解码成字符串（解决中文乱码）
    const decoded = new TextDecoder("utf-8").decode(byteArray);

    return decoded;
  } catch (error: any) {
    return NextResponse.json({ error: `错误: ${error.message}` }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });


console.log('process.env.GITHUB_TOKEN', process.env.GITHUB_TOKEN);

export async function getNoteBook(path: any) {
  const pathMap: any = {
    html: 'Resource/html.md',
    js: 'Resource/JS总结.md',
    ts: 'Resource/typeScript.md',
    css: 'Resource/css.md',
    react: 'Resource/react.md',
    reactp: 'Resource/Reactplus.md',
    nodejs: 'Resource/NodeJS总结.md',
    wp: 'Resource/webpack.md',
    net: 'Resource/计算机网络总结.md'
  }
  const pathT = String(pathMap[path]);

  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is NotFount');
  }

  try {
    const response: any = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'Y-small-space',
      repo: 'PD',
      path: pathT,
    });

    console.log("response", response);

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

    console.log("decoded", decoded);


    return decoded;
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: `错误: ${error.message}` }, { status: 500 });
  }
}
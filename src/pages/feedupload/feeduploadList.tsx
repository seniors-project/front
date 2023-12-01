import tw from 'twin.macro';
import React from 'react';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postNewsfeed } from '@/apis/newsfeed';

function FeedUploadList() {
  const queryClient = useQueryClient();

  const mutation = useMutation(postNewsfeed, {
    onSuccess: () => {
      alert('작성 완료!');
    },
    onError: () => {
      alert('작성 오류!');
    },
  });

  const [img, setImg] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.files) {
      const uploadimg = e.target.files[0];
      formData.append('img', uploadimg);
      setImg(uploadimg);
      console.log(uploadimg);
      console.log(img);
    }
  };

  const onSubmitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const confirmForm = {
      title,
      content,
    };
    console.log(confirmForm);
    mutation.mutate(confirmForm);
  };

  return (
    <>
      <FeedUploadListBox />
      <FeedUploadImgLabel htmlFor="file">사진추가</FeedUploadImgLabel>
      <FeedUploadImg
        multiple
        type="file"
        name="file"
        id="file"
        onChange={onChangeImg}></FeedUploadImg>
      <FeedUpLoadTitle>제목</FeedUpLoadTitle>
      <FeedUpLoadTitleInput
        id={title}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        placeholder="본명을 입력해 주세요."></FeedUpLoadTitleInput>
      <FeedUpLoadbody>내용</FeedUpLoadbody>
      <FeedUpLoadbodyInput
        id={content}
        value={content}
        onChange={e => {
          setContent(e.target.value);
        }}
        placeholder="최소 10자 이상 내용을 입력해 주세요."
        minLength={10}></FeedUpLoadbodyInput>
      <FeedUpLoadButton onClick={onSubmitHandler}>등록</FeedUpLoadButton>
    </>
  );
}

export default FeedUploadList;

const FeedUploadImgLabel = tw.label`
w-[100px] rounded-[4px] absolute bottom-[750px] left-[400px] bg-gray-200 pl-[22px] cursor-pointer ml-[20px]
`;

const FeedUploadListBox = tw.div`
w-[1250px] h-[820px] rounded-[20px] bg-white border-l border-gray-300 
`;

const FeedUploadImg = tw.input`
hidden
`;
const FeedUpLoadTitle = tw.div`
absolute bottom-[700px] left-[400px] font-bold ml-[20px]
`;
const FeedUpLoadTitleInput = tw.input`
absolute bottom-[650px] left-[400px] bg-gray-200 w-[1000px] h-[50px] ml-[20px] rounded-lg
`;

const FeedUpLoadbody = tw.div`
absolute bottom-[600px] left-[400px] font-bold ml-[20px]
`;

const FeedUpLoadbodyInput = tw.input`
absolute bottom-[400px] left-[400px] w-[1000px] h-[200px] bg-gray-200 ml-[20px] rounded-lg
`;

const FeedUpLoadButton = tw.button`
  w-[100px] h-[45px] rounded-[4px] absolute bottom-4 bg-gray-300 text-gray-500
`;

import tw from 'twin.macro';
import React from 'react';

function FeedUploadList() {
  return (
    <>
      <FeedUploadListBox />
      <FeedUploadImgLabel htmlFor="file">사진추가</FeedUploadImgLabel>
      <FeedUploadImg type="file" name="file" id="file"></FeedUploadImg>
      <FeedUpLoadTitle>제목</FeedUpLoadTitle>
      <FeedUpLoadTitleInput placeholder="본명을 입력해 주세요."></FeedUpLoadTitleInput>
      <FeedUpLoadbody>내용</FeedUpLoadbody>
      <FeedUpLoadbodyInput
        placeholder="최소 10자 이상 내용을 입력해 주세요."
        minLength={10}></FeedUpLoadbodyInput>
      <FeedUpLoadButton>등록</FeedUpLoadButton>
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

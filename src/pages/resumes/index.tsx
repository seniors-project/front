import React, { useState } from 'react';
import tw from 'twin.macro';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { getResumes } from '@/apis/resume';
import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

import { Layout } from '@/components/Layout';
import { Container } from '@/styles';

const RegisterResumeBanner = tw.div`
  py-10 bg-white
`;

const Description = tw.div`
  font-semibold text-3xl leading-10
`;

const BtnWapper = tw.div`
  mt-6
`;

const RegisterResumeBtn = tw.button`
  h-16
  w-80
  border-none
  bg-primary-main
  text-white
  font-bold
  text-2xl
  rounded-lg
`;

const ResumeList = tw.div`
  mt-9
`;

const ResumeCard = tw.li`
  mt-4
  bg-white
  rounded-xl
  shadow-xl
  shadow-gray-200
`;

const ResumeCardHeader = tw.div`
  flex px-6 py-4
`;
const ResumeCardHeaderProfileImg = tw.div`
  w-20
  h-20
  rounded-full
  overflow-hidden
  bg-amber-500
  mr-2
`;
const ResumeCardHeaderProfile = tw.div`
  p-2
`;
const ResumeCardChatButton = tw.div`
  w-48
  h-14
  font-medium
  text-[#515A64]
  text-2xl
  my-auto
  flex
  ml-auto
  bg-[#EAECEF]
  rounded-sm
`;

const ResumeCardBody = tw.div`
  border-t p-6
`;
const ResumeDe = tw.div`
  font-medium 
  text-2xl
  mb-6
  leading-9
`;
const ResumeHistory = tw.div`
  border-t-2 font-regular text-2xl
`;
const ResumeHistoryLi = tw.li`
  flex mt-4
`;
const HistoryPeriod = tw.div`
  w-60 mr-14
`;

const ResumeListPage = ({ token }: { token: string }) => {
  const [limit, setLimit] = useState(150);

  const { status, data, error, fetchNextPage } = useInfiniteQuery(
    ['resumes'],
    async ({ pageParam }) => {
      const response = await getResumes(token, pageParam);
      const resumes = response.data.content;
      const nextCursor = resumes?.slice(-1)?.[0]?.id;

      return { resumes, nextCursor };
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor;
      },
    },
  );

  const resumes = data?.pages?.flatMap(page => page.resumes);

  const [sentryRef] = useInfiniteScroll({
    loading: status === 'loading',
    hasNextPage: true,
    onLoadMore: fetchNextPage,
  });

  if (status === 'loading') return <span>Loading...</span>;

  if (status === 'error') return <span>Error: {Object(error).message}</span>;

  const toggleEllipsis = (str: string, limit: number) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };

  const onClickMore = (str: string) => {
    setLimit(str.length);
  };

  return (
    <Layout>
      <RegisterResumeBanner>
        <Container>
          <Description>
            <p>
              인생 2모작에 도전하는 <br />
              시니어스에 이력서를 등록해 보세요!
            </p>
          </Description>
          <BtnWapper>
            <RegisterResumeBtn>공개 이력서 등록하기</RegisterResumeBtn>
          </BtnWapper>
        </Container>
      </RegisterResumeBanner>

      <Container>
        <ResumeList>
          <div>
            <h2 tw="font-semibold text-3xl">전체 목록</h2>
          </div>
          {resumes && resumes?.length > 0 && (
            <ul>
              {resumes.map(data => (
                <ResumeCard key={data.id}>
                  <ResumeCardHeader>
                    <ResumeCardHeaderProfileImg>
                      <Image
                        src={data.photoUrl}
                        alt="profile img"
                        width={500}
                        height={100}
                      />
                    </ResumeCardHeaderProfileImg>
                    <ResumeCardHeaderProfile>
                      <p tw="font-bold text-2xl">{data.name}</p>
                      <div tw="flex flex-nowrap mt-1">
                        <p tw="font-semibold text-base">{data.occupation}</p>
                        <p tw="font-medium text-base text-[#878E95] ml-1.5">
                          선호
                        </p>
                      </div>
                    </ResumeCardHeaderProfile>
                    <ResumeCardChatButton>
                      <button tw="mx-auto">채팅하기</button>
                    </ResumeCardChatButton>
                  </ResumeCardHeader>
                  <ResumeCardBody>
                    <ResumeDe>
                      <p>
                        {toggleEllipsis(data.introduce, limit).string}
                        {toggleEllipsis(data.introduce, limit).isShowMore && (
                          <span
                            onClick={() => onClickMore(data.introduce)}
                            tw="text-slate-500 cursor-pointer">
                            <span tw="text-black">...</span>
                            더보기
                          </span>
                        )}
                      </p>
                    </ResumeDe>
                    <ResumeHistory>
                      {data.careers.length > 0 && (
                        <ul>
                          {data.careers.map(career => (
                            <ResumeHistoryLi key={career.id}>
                              <HistoryPeriod>
                                {`${career.startedAt} ~ ${career.endedAt}`}
                              </HistoryPeriod>
                              <div>{career.company}</div>
                            </ResumeHistoryLi>
                          ))}
                        </ul>
                      )}
                    </ResumeHistory>
                  </ResumeCardBody>
                </ResumeCard>
              ))}
            </ul>
          )}
          <div ref={sentryRef} tw="h-px" />
        </ResumeList>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context.req.headers.cookie || '');

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await userValidate(accessToken);
    return {
      props: { user: response.data, token: accessToken },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};

export default ResumeListPage;

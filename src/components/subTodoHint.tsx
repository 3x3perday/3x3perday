import React from 'react';
import {css} from "@emotion/react";

type propsType = {};

export default function SubTodoHint(props: propsType) {
	return (
		<div css={css`
      @keyframes fadeout {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      animation: fadeout 3s;
      animation-fill-mode: forwards;
		`}>
			<div css={css`
        position: absolute;
        width: 192px;
        height: 35px;
        //border: 2px solid #A5A5A5;
        left: -2px;
        bottom: -7px;
        translate: 0 100%;
        background-color: #A5A5A5;
        font-family: Apple SD Gothic Neo, serif;
        text-align: center;
        line-height: 24px;
        color: #A5A5A5;
        font-size: 8px;
        letter-spacing: 0.2px;
        z-index: 150;

        ::after {
          z-index: 100;
          content: '';
          position: absolute;
          translate: -50%;
          left: calc(50%);

          top: -20px;
          margin-top: -20px;
          border-top: 22px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 20px solid #A5A5A5;
          border-left: 10px solid transparent;
        }
			`}>

			</div>
			<div css={css`
        position: absolute;
        width: 188px;
        height: 31px;
        left: 0;
        bottom: -9px;
        translate: 0 100%;
        background-color: #D9D9D9;
        font-family: Apple SD Gothic Neo, serif;
        text-align: center;
        line-height: 24px;
        color: #A5A5A5;
        font-size: 8px;
        letter-spacing: 0.2px;
        z-index: 200;
        display: flex;
        justify-content: center;
        align-items: center;

        ::after {
          z-index: 100;
          content: '';
          position: absolute;
          translate: -50%;
          left: calc(50%);
          top: -20px;
          margin-top: -20px;
          border-top: 25px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 20px solid #D9D9D9;
          border-left: 10px solid transparent;
        }
			`}>
				과업을 완수하기 위한 3가지 작은 일들을 정리해보세요.
			</div>
		</div>

	);
}
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import RangeInput from '../../components/RangeInput'
import Button from '../../components/Button'
import {getCharacter, submitAnnotation} from '../../firebase'

const musumeCount = 88

function initialRemainingTasks() {
  const rt = []
  for (let i = 1; i <= musumeCount; i++) {
    rt.push(String(i).padStart(2, '0'))
  }
  return rt
}

const Page = () => {
  const [cute, setCute] = useState(0)
  const [active,setActive] = useState(0)
  const [adult,setAdult] = useState(0)
  const [fat,setFat] = useState(0)
  const [chest, setChest] = useState(0)
  const [sadism, setSadism] = useState(0)
  const [erotic, setErotic] = useState(0)
  const [sentimental, setSentimental] = useState(0)
  const [leader, setLeader] = useState(0)
  const [outdoor, setOutdoor] = useState(0)
  const [character, setCharacter] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  const [remainingTasks, setRemainingTasks] = useState(initialRemainingTasks())

  useEffect(() => {
    pickTask()
  }, [])

  async function submit() {
    await submitAnnotation({id: currentTask,cute,active,adult,fat,chest,sadism,erotic,sentimental,leader,outdoor})
    pickTask()
  }

  async function pickTask() {
    if (remainingTasks.length === 0) {
      setCurrentTask(null)
      return
    }
    const task = remainingTasks[Math.floor(Math.random() * remainingTasks.length)]
    setCharacter(await getCharacter(task))
    setCurrentTask(task)
    setRemainingTasks(remainingTasks.filter(i => i !== task))
    setCute(0)
    setActive(0)
    setAdult(0)
    setFat(0)
    setChest(0)
    setSadism(0)
    setErotic(0)
    setSentimental(0)
    setLeader(0)
    setOutdoor(0)
  }

  function isDisable() {
    return !cute && !active && !adult && !fat && !chest && !sadism && !erotic && !sentimental && !leader && !outdoor
  }

  if (!currentTask) {
    return (
      <>
        <Head>
          <title>おむろったーあのてーしょん</title>
        </Head>
        <div>
          <h1>おむろったーあのてーしょん</h1>
          <h2>おつかれさま！</h2>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>おむろったーあのてーしょん</title>
      </Head>
      <Body>
        <Title>おむろったーあのてーしょん</Title>
        <Progress>
          <progress max={musumeCount} value={musumeCount - remainingTasks.length} />
          {musumeCount - remainingTasks.length - 1}人完了
        </Progress>
        <Container>
          <Character>
            <img src={`/images/${currentTask}.jpg`} />
          </Character>
          <Controller>
            <h2>{character.id} {character.name}({character.nameKana})</h2>
            <RangeInput left="かっこいい" right="かわいい" value={cute} onChange={setCute} />
            <RangeInput left="おとなしい" right="元気いっぱい" value={active} onChange={setActive} />
            <RangeInput left="子供" right="お姉さん" value={adult} onChange={setAdult} />
            <RangeInput left="スレンダー" right="むっちり" value={fat} onChange={setFat} />
            <RangeInput left="貧乳" right="巨乳" value={chest} onChange={setChest} />
            <RangeInput left="マゾヒズム" right="サディズム" value={sadism} onChange={setSadism} />
            <RangeInput left="清楚" right="淫乱" value={erotic} onChange={setErotic} />
            <RangeInput left="論理的" right="感情的" value={sentimental} onChange={setSentimental} />
            <RangeInput left="サポート派" right="リーダー派" value={leader} onChange={setLeader} />
            <RangeInput left="インドア派" right="アウトドア派" value={outdoor} onChange={setOutdoor} />
            <Button onClick={submit} label="送信！" disabled={isDisable()} />
          </Controller>
        </Container>
        <div>
          <h3>ごあんない</h3>
          <ul>
            <li>このプログラムはいまのところ safetynet 向けです(拡散禁止！)</li>
            <li>キャラクターに対する、あなたの主観的な印象を入力してください</li>
            <li>好きなときに作業を終了して問題ありません(送信されたデータのみ記録されます)</li>
            <li>集まったデータはランキング、レコメンドエンジン、機械学習などに応用するかもです</li>
          </ul>
        </div>
      </Body>
    </>
  )
}

const Body = styled.div`
  width: 1000px;
  margin: 0 auto;
`
const Title = styled.h1`
  font-size: 1.4rem;
`
const Container = styled.div`
  display: flex;
`
const Character = styled.div`
  width: 400px;
  > img {
    width: 100%;
  }
`
const Controller = styled.div`
  text-align: center;
  > button {
    margin: 20px;
  }
`
const Progress = styled.div`
  text-align: right;
  > progress {
    width: 100%;
  }
`
export default Page

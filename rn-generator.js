const fs = require('fs')
const { exit } = require('process')
const readline = require('readline')

const { program } = require('commander')

const generateComponent = (componentName, allowExtensions) => {
  return `import React from 'react'
import { Text } from 'react-native'
import { T${componentName}Props } from './types${allowExtensions ? '.ts' : ''}'
import { Container } from './styled${allowExtensions ? '.ts' : ''}'

export const ${componentName} = ({ prop }: T${componentName}Props) => {
  return (
    <Container>
      <Text>Hello, {prop}, from generator!</Text>
    </Container>
  )
}
`
}

const generateStyled = () => {
  return `import { View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)\`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  align-items: center;
  justify-content: center;
\`;
`
}

const generateTypes = componentName => {
  return `export type T${componentName}Props = {
  prop: any
};
`
}

const generateIndex = (componentName, allowExtensions) => {
  return `export * from './${componentName}${allowExtensions ? '.tsx' : ''}'
`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

program
  .name('rn-generator')
  .description('A component generator for React Native.')
  .option('-e', 'use imports with extensions (.tsx)')
  .parse()

const options = program.opts()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Enter the path to the folder where to generate: ', rawPath => {
  const path = rawPath.replace(/^['"]|['"]$/g, '') // Remove leading/trailing quotes
  rl.question('Enter the component name: ', component => {
    rl.close()

    if (path && component) {
      const componentName = capitalizeFirstLetter(component)
      const componentFolderPath = `${path}/${componentName}`

      if (!fs.existsSync(componentFolderPath)) {
        console.log(
          `Folder ${componentFolderPath} doesn't exist! Trying to create folder...`,
        )
        fs.mkdirSync(componentFolderPath, { recursive: true })
      }

      // component
      fs.writeFile(
        `${componentFolderPath}/${componentName}.tsx`,
        generateComponent(componentName, options.e),
        error => {
          if (error) {
            console.log(error)
            exit
          }
          console.log(
            `✅ ${componentFolderPath}/${componentName}.tsx created successfully.`,
          )
        },
      )

      // styled
      fs.writeFile(
        `${componentFolderPath}/styled.ts`,
        generateStyled(),
        error => {
          if (error) {
            return console.log(error)
          }
          console.log(
            `✅ ${componentFolderPath}/styled.ts created successfully.`,
          )
        },
      )

      // types
      fs.writeFile(
        `${componentFolderPath}/types.ts`,
        generateTypes(componentName),
        error => {
          if (error) {
            return console.log(error)
          }
          console.log(
            `✅ ${componentFolderPath}/types.ts created successfully.`,
          )
        },
      )

      // index
      fs.writeFile(
        `${componentFolderPath}/index.ts`,
        generateIndex(componentName, options.e),
        error => {
          if (error) {
            return console.log(error)
          }
          console.log(
            `✅ ${componentFolderPath}/index.ts created successfully.`,
          )
        },
      )
    }
  })
})

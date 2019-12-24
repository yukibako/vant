import { join } from 'path';
import { existsSync } from 'fs-extra';
import {
  ROOT,
  JEST_INIT_FILE,
  JEST_FILE_MOCK_FILE,
  JEST_STYLE_MOCK_FILE
} from '../common/constant';

const DEFAULT_CONFIG = {
  moduleNameMapper: {
    '\\.(css|less|scss)$': JEST_STYLE_MOCK_FILE,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': JEST_FILE_MOCK_FILE
  },
  setupFiles: [JEST_INIT_FILE],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  transform: {
    '\\.(vue)$': 'vue-jest',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!(@vant/cli))/'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!**/style/**',
    '!**/demo/**'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage'
};

function readRootConfig() {
  const ROOT_CONFIG_PATH = join(ROOT, 'jest.config.js');

  if (existsSync(ROOT_CONFIG_PATH)) {
    return require(ROOT_CONFIG_PATH);
  }

  return {};
}

module.exports = {
  ...DEFAULT_CONFIG,
  ...readRootConfig()
};
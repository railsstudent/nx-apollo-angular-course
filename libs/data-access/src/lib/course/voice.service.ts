import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private readonly isSupported: boolean
  private voices: SpeechSynthesisVoice[] = []
  private speakVoices: Record<string, SpeechSynthesisVoice> = {}

  constructor() {
    this.isSupported = !!window.speechSynthesis

    if (this.isSupported) {
      this.voices = window.speechSynthesis.getVoices()
      this.buildSpeakVoices()

      window.speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = window.speechSynthesis.getVoices()
        this.buildSpeakVoices()
      })
    }
  }

  private buildSpeakVoices(): void {
    this.speakVoices['English'] = this.voices.find(voice => voice.name === 'Google US English')
    this.speakVoices['Spanish'] = this.voices.find(voice => voice.name === 'Google español de Estados Unidos')
    this.speakVoices['Chinese'] = this.voices.find(voice => voice.lang === 'zh-HK')
    this.speakVoices['Portuguese'] = this.voices.find(voice => voice.lang === 'pt-BR')
  }

  speak(text: string, language: string): void {
    if (!this.isSupported) {
      return
    }

    this.stop()

    const selectedVoice = this.speakVoices[language]
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = selectedVoice
      utterance.rate = 0.75
      utterance.volume = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  stop(): void {
    if (!this.isSupported) {
      return
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }
  }
}

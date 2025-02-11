- 도메인 호스팅 : hostingkr, 구글오어스 포우, 2년 21450원
- vercel 월 20달러
- 수퍼베이스 : 월 25달러

```ts
// 맥OS 한글 마지막 중복입력 에러
if (e.nativeEvent.isComposing || e.key !== 'Enter') return
```

## 규칙

- 선언순서

1. 구조분해 2. next hook 3. custom hook 4. react hook /

- 타입선언

  import ( type ~ ) from ~

- Props 타이핑

props가 한개인경우 구조분해 할당으로, 2개 이상인 경우 타입 선언

```ts
🚫🚫
type Props = {
  defaultChartOrders: SelectedIcuOrder[]
}

export default function DefaultOrdersTable({
  defaultChartOrders,
}: Props) {}


✅✅
export default function DefaultOrdersTable({
  defaultChartOrders,
}: {
  defaultChartOrders: SelectedIcuOrder[]
}) {}
```

- CRUD 함수 명명법

  - create : insertTodo
  - read : getTodo
  - update : updateTodo
  - delete : deleteTodo

- boolean 변수는 isEdit, isIcu 등 is 붙이기

- Visually hidden

```tsx
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
export default function CalculatorSheetContent() {
  return (
    <VisuallyHidden>
      <SheetTitle />
      <SheetDescription />
    </VisuallyHidden>
  )
}
```

- 하나의 object를 가져오는 경우, 다수의 객체를 가져오는 경우 함수 명명

```
getTodo
getTodos
```

import { path } from 'app-root-path';
import { join } from 'path';
import { highlightScreenshotToPath } from './highlightScreenshot';
import { getThemes } from './themes/getThemes';

const testPath = (fileName: string): string => join(path, 'images', fileName);

const testTheme = async (): Promise<string> => {
    const themes = await getThemes();
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    return randomTheme.name;
};

describe('Trying some code', () => {
    test('Test something', async () => {
        const result = await highlightScreenshotToPath(`something`, testPath('something.png'), true);

        expect(result.buffer).toBeDefined();
    });
    test('Test javascript', async () => {
        const result = await highlightScreenshotToPath(
            `console.log('test');`,
            testPath('javascript.png'),
            true,
            await testTheme(),
            ['javascript'],
        );

        expect(result.buffer).toBeDefined();
    });

    test('Test JSON', async () => {
        const result = await highlightScreenshotToPath(
            `{
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}`,
            testPath('json.png'),
            true,
            await testTheme(),
        );

        expect(result.buffer).toBeDefined();
    });

    test('Test CSharp', async () => {
        const result = await highlightScreenshotToPath(
            `using System.IO.Compression;

#pragma warning disable 414, 3021

namespace MyApplication
{
    [Obsolete("...")]
    class Program : IInterface
    {
        public static List<int> JustDoIt(int count)
        {
            Span<int> numbers = stackalloc int[length];
            Console.WriteLine($"Hello {Name}!");
            return new List<int>(new int[] { 1, 2, 3 })
        }
    }
}`,
            testPath('csharp.png'),
            true,
            await testTheme(),
        );

        expect(result.buffer).toBeDefined();
    });

    test('Test XML', async () => {
        const result = await highlightScreenshotToPath(
            `<?xml version="1.0" encoding="UTF-8"?>
<breakfast_menu>
  <food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
    <calories>650</calories>
  </food>
  <food>
    <name>Strawberry Belgian Waffles</name>
    <price>$7.95</price>
    <description>Light Belgian waffles covered with strawberries and whipped cream</description>
    <calories>900</calories>
  </food>
  <food>
    <name>Berry-Berry Belgian Waffles</name>
    <price>$8.95</price>
    <description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description>
    <calories>900</calories>
  </food>
  <food>
    <name>French Toast</name>
    <price>$4.50</price>
    <description>Thick slices made from our homemade sourdough bread</description>
    <calories>600</calories>
  </food>
  <food>
    <name>Homestyle Breakfast</name>
    <price>$6.95</price>
    <description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
    <calories>950</calories>
  </food>
  <food>
    <name>French Toast</name>
    <price>$4.50</price>
    <description>Thick slices made from our homemade sourdough bread</description>
    <calories>600</calories>
  </food>
  <food>
    <name>Homestyle Breakfast</name>
    <price>$6.95</price>
    <description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
    <calories>950</calories>
  </food>          
  <food>
    <name>French Toast</name>
    <price>$4.50</price>
    <description>Thick slices made from our homemade sourdough bread</description>
    <calories>600</calories>
  </food>
  <food>
    <name>Homestyle Breakfast</name>
    <price>$6.95</price>
    <description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
    <calories>950</calories>
  </food>
  <food>
    <name>French Toast</name>
    <price>$4.50</price>
    <description>Thick slices made from our homemade sourdough bread</description>
    <calories>600</calories>
  </food>
  <food>
    <name>Homestyle Breakfast</name>
    <price>$6.95</price>
    <description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
    <calories>950</calories>
  </food>
</breakfast_menu>`,
            testPath('xml.png'),
            true,
            await testTheme(),
        );

        expect(result.buffer).toBeDefined();
    });

    test('Test Go', async () => {
        const result = await highlightScreenshotToPath(
            `func SampleParallelWorkflow(ctx workflow.Context) ([]string, error) {
  logger := workflow.GetLogger(ctx)
  defer logger.Info("Workflow completed.")

  ao := workflow.ActivityOptions{
    ScheduleToStartTimeout: time.Minute,
    StartToCloseTimeout:    time.Minute,
    HeartbeatTimeout:       time.Second * 20,
  }
  ctx = workflow.WithActivityOptions(ctx, ao)

  future1, settable1 := workflow.NewFuture(ctx)
  workflow.Go(ctx, func(ctx workflow.Context) {
    defer logger.Info("First goroutine completed.")

    var results []string
    var result string
    err := workflow.ExecuteActivity(ctx, SampleActivity, "branch1.1").Get(ctx, &result)
    if err != nil {
      settable1.SetError(err)
      return
    }
    results = append(results, result)
    err = workflow.ExecuteActivity(ctx, SampleActivity, "branch1.2").Get(ctx, &result)
    if err != nil {
      settable1.SetError(err)
      return
    }
    results = append(results, result)
    settable1.SetValue(results)
  })

  future2, settable2 := workflow.NewFuture(ctx)
  workflow.Go(ctx, func(ctx workflow.Context) {
    defer logger.Info("Second goroutine completed.")

    var result string
    err := workflow.ExecuteActivity(ctx, SampleActivity, "branch2").Get(ctx, &result)
    settable2.Set(result, err)
  })

  var results []string
  // Future.Get returns error from Settable.SetError
  // Note that the first goroutine puts a slice into the settable while the second a string value
  err := future1.Get(ctx, &results)
  if err != nil {
    return nil, err
  }
  var result string
  err = future2.Get(ctx, &result)
  if err != nil {
    return nil, err
  }
  results = append(results, result)

  return results, nil
}`,
            testPath('go.png'),
            true,
            await testTheme(),
        );

        expect(result.buffer).toBeDefined();
    });

    test('Test Python', async () => {
        const result = await highlightScreenshotToPath(
            `def jpeg_res(filename):
  """"This function prints the resolution of the jpeg image file passed into it"""

  # open image for reading in binary mode
  with open(filename,'rb') as img_file:

      # height of image (in 2 bytes) is at 164th position
      img_file.seek(163)

      # read the 2 bytes
      a = img_file.read(2)

      # calculate height
      height = (a[0] << 8) + a[1]

      # next 2 bytes is width
      a = img_file.read(2)

      # calculate width
      width = (a[0] << 8) + a[1]

  print("The resolution of the image is",width,"x",height)

jpeg_res("img1.jpg")`,
            testPath('python.png'),
            true,
            await testTheme(),
        );

        expect(result.buffer).toBeDefined();
    });
});
